import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HotToastService } from '@ngxpert/hot-toast';
import { AdminService } from '../../../core/services/admin/admin-service';

//  Field config interface
export interface BannerField {
  type: 'text' | 'number' | 'url' | 'date' | 'toggle' | 'file';
  id: string;
  label: string;
  placeholder?: string;
  hint?: string;
  validation?: Record<string, string>;
}

//  Banner data interface (mirrors Sequelize model) 
export interface BannerItem {
  id: number;
  title: string;
  imageUrl: string;
  redirectUrl?: string;
  isActive: boolean;
  priority: number;
  startDate: string;
  endDate: string;
  createdAt?: Date;
}

//  Group-level validator: endDate must be after startDate 
function endAfterStart(group: AbstractControl) {
  const start = group.get('startDate')?.value;
  const end   = group.get('endDate')?.value;
  if (start && end && new Date(end) <= new Date(start)) {
    group.get('endDate')?.setErrors({ endBeforeStart: true });
    return { endBeforeStart: true };
  }
  return null;
}

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './banner.html',
  styleUrl: './banner.css',
})
export class Banner implements OnInit {

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  adminService = inject(AdminService)
  toast = inject(HotToastService)

  //  State 
  banners             = signal<BannerItem[]>([]);
  isDragging          = signal(false);
  previewUrl          = signal<string | null>(null);
  showForm            = signal(false);
  editingId           = signal<number | null>(null);
  formSubmitted       = false;
  activeCarouselIndex = 0;
  selectedFile: File | null = null;
  fileError: string | null = null;


  bannerForm: FormGroup = new FormGroup(
    {
      title:       new FormControl('',   [Validators.required, Validators.minLength(3)]),
      imageUrl:    new FormControl('',   [Validators.required]),
      redirectUrl: new FormControl(''),
      isActive:    new FormControl(true),
      priority:    new FormControl(1,    [Validators.required, Validators.min(1)]),
      startDate:   new FormControl('',   [Validators.required]),
      endDate:     new FormControl('',   [Validators.required]),
    },
    { validators: endAfterStart }
  );

  //  Field config 
  bannerFieldConfig: BannerField[] = [
    {
      type: 'text',
      id: 'title',
      label: 'Banner Title',
      placeholder: 'e.g. Flash Sale — Up to 70% Off',
      hint: 'Displayed as the banner label in the admin list.',
      validation: {
        required: 'Title is required.',
        minlength: 'Title must be at least 3 characters.',
      },
    },
    {
      type: 'file',
      id: 'imageUrl',
      label: 'Banner Image',
      hint: 'Recommended: 1400 × 400 px — PNG, JPG or WEBP.',
      validation: {
        required: 'A banner image is required.',
      },
    },
    {
      type: 'url',
      id: 'redirectUrl',
      label: 'Redirect URL',
      placeholder: 'https://example.com/sale',
      hint: 'Optional — where users land when they click the banner.',
    },
    {
      type: 'number',
      id: 'priority',
      label: 'Priority',
      placeholder: '1',
      hint: 'Lower number = shown first in the carousel.',
      validation: {
        required: 'Priority is required.',
        min: 'Priority must be at least 1.',
      },
    },
    {
      type: 'date',
      id: 'startDate',
      label: 'Start Date',
      hint: 'Banner becomes visible from this date.',
      validation: {
        required: 'Start date is required.',
      },
    },
    {
      type: 'date',
      id: 'endDate',
      label: 'End Date',
      hint: 'Banner is hidden after this date.',
      validation: {
        required: 'End date is required.',
        endBeforeStart: 'End date must be after the start date.',
      },
    },
    {
      type: 'toggle',
      id: 'isActive',
      label: 'Active',
      hint: 'Inactive banners are hidden from the storefront.',
    },
  ];

  //  Lifecycle 
  ngOnInit(): void {
    
    this.loadInitialData();
  }

  loadInitialData() {
    this.adminService.getAllBanner().subscribe({
           next: (res: any) => {
             this.banners.set(res.data);
             this.toast.success("Sucessfully get banners")
            },
            error: () => {
             this.toast.success("Failed to get banners")
             
           }
      });
    }

  //  Form helpers 
  get f() { return this.bannerForm.controls; }

  
  getError(field: BannerField): string | null {
    if (!field.validation) return null;
    const ctrl = this.bannerForm.get(field.id);
    if (!ctrl || !(ctrl.touched || this.formSubmitted)) return null;

    for (const [key, msg] of Object.entries(field.validation)) {
      if (ctrl.hasError(key)) return msg;
    }
    // Group-level error surfaced on endDate
    if (field.id === 'endDate' && this.bannerForm.hasError('endBeforeStart')) {
      return field.validation['endBeforeStart'] ?? null;
    }
    return null;
  }

  isInvalid(id: string): boolean {
    const ctrl = this.bannerForm.get(id);
    return !!ctrl && ctrl.invalid && (ctrl.touched || this.formSubmitted);
  }

  //  Carousel helpers 
  sortedBanners():  BannerItem[] { return [...this.banners()].sort((a, b) => a.priority - b.priority); }
  activeBanners():  BannerItem[] { return this.sortedBanners().filter(b => b.isActive); }

  prevSlide(): void {
    const len = this.activeBanners().length;
    this.activeCarouselIndex = (this.activeCarouselIndex - 1 + len) % len;
  }
  nextSlide(): void {
    this.activeCarouselIndex = (this.activeCarouselIndex + 1) % this.activeBanners().length;
  }
  goToSlide(i: number): void { this.activeCarouselIndex = i; }

  //  File / drag-drop 
  triggerFileInput(): void { this.fileInput.nativeElement.click(); }

  onFileSelected(e: Event): void {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
      this.handleFile(file);
    }

    onDrop(e: DragEvent): void {
      e.preventDefault();
      this.isDragging.set(false);
      const file = e.dataTransfer?.files?.[0];
      if (file) this.handleFile(file);
    }

    onDragOver(e: DragEvent): void { e.preventDefault(); this.isDragging.set(true); }
    onDragLeave(): void            { this.isDragging.set(false); }

  private handleFile(file: File): void {
    this.fileError = null;

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    const maxSizeBytes = 10 * 1024 * 1024; // 10 MB

    if (!allowedTypes.includes(file.type)) {
      this.fileError = 'Invalid file type. Only JPG, PNG, WEBP, GIF are allowed.';
      this.clearFile();
      return;
    }

    if (file.size > maxSizeBytes) {
      this.fileError = 'File too large. Maximum size is 10 MB.';
      this.clearFile();
      return;
    }

    //  Valid — store the raw File for S3 upload
    this.selectedFile = file;

    // Mark form control as valid so required error clears
    this.bannerForm.get('imageUrl')!.setValue('PENDING_UPLOAD');
    this.bannerForm.get('imageUrl')!.markAsTouched();

    // Show preview from the File object (never stored in form)
    const reader = new FileReader();
    reader.onload = (ev) => this.previewUrl.set(ev.target!.result as string);
    reader.readAsDataURL(file);
  }

  private clearFile(): void {
    this.selectedFile = null;
    this.previewUrl.set(null);
    
    this.bannerForm.get('imageUrl')!.setValue('');
    this.bannerForm.get('imageUrl')!.markAsTouched();
  
    if (this.fileInput?.nativeElement) this.fileInput.nativeElement.value = '';
  }
  

  private loadPreview(file: File): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target!.result as string;
      this.previewUrl.set(url);
      this.bannerForm.patchValue({ imageUrl: url });
      this.bannerForm.get('imageUrl')!.markAsTouched();
    };
    reader.readAsDataURL(file);
  }

  //  Open / close form 
  openCreateForm(): void {
    this.editingId.set(null);
    this.formSubmitted = false;
    this.previewUrl.set(null);
    this.bannerForm.reset({ isActive: true, priority: 1 });
    this.showForm.set(true);
    setTimeout(() => document.getElementById('banner-form')?.scrollIntoView({ behavior: 'smooth' }), 50);
  }

  openEditForm(banner: BannerItem): void {
    this.editingId.set(banner.id);
    this.formSubmitted = false;
    this.previewUrl.set(banner.imageUrl);
    this.bannerForm.patchValue({
      title:       banner.title,
      imageUrl:    banner.imageUrl,
      redirectUrl: banner.redirectUrl ?? '',
      isActive:    banner.isActive,
      priority:    banner.priority,
      startDate:   banner.startDate,
      endDate:     banner.endDate,
    });
    this.showForm.set(true);
    setTimeout(() => document.getElementById('banner-form')?.scrollIntoView({ behavior: 'smooth' }), 50);
  }

  closeForm(): void {
    this.showForm.set(false);
    this.editingId.set(null);
    this.previewUrl.set(null);
    this.bannerForm.reset({ isActive: true, priority: 1 });
    this.formSubmitted = false;
  }

  //  Submit 
 onSubmit(): void {
  this.formSubmitted = true;
  this.bannerForm.markAllAsTouched();
  if (this.bannerForm.invalid) return;

  const raw = this.bannerForm.value;
  const id  = this.editingId();

  if (id !== null) {
    // EDIT — if a new file was picked, upload it first
    if (this.selectedFile) {
      // 1. delete the old s3  
      // 2. upload new file 
      // 3. save into db 
       let item =  this.banners().find((item)=> item.id === id ) 
       let hash = item?.imageUrl.split('/').pop(); 

      this.adminService.updateWithNewFileBanner(this.selectedFile, raw, id, hash).subscribe({
        next: (res: any) => {
               
                this.saveBanner(res.data, id);
                this.toast.success("Sucessfully update banner")
              },
              error: () => {
              this.toast.success("Failed to update banner")
            }
        });

    } else {
      // save into db 
      this.adminService.editBanner(id, raw).subscribe({
      next: (res: any) => {
              this.saveBanner(raw, id);
              this.toast.success("Sucessfully update banner")
            },
            error: () => {
             this.toast.success("Failed to update banner")
           }
      });
      
    }
  } else {
    // create new 
    if(!this.selectedFile)  return; 
    
    this.adminService.createBanner(this.selectedFile, raw).subscribe({
      next: (res: any) => {
          // console.log('res data => ', res.data)
            this.saveBanner(res.data, null);
             this.toast.success("Sucessfully create banner")
            },
            error: () => {
             this.toast.success("Failed to create banner")
           }
      });

  }
}


private saveBanner(data: any, id: number | null): void {
  if (id !== null) {
    this.banners.update(list => list.map(b => b.id === id ? { ...b, ...data } : b));
    // console.log('Update banner =>', data);
  } else {
    this.banners.update(list => [...list, { id: Date.now(), ...data }]);
    // console.log('Create banner =>', data);
  }
  this.closeForm();
}

  //  Delete 
  onDelete(banner: BannerItem): void {
    this.adminService.deleteBanner(banner.id, banner.imageUrl).subscribe({
      next: (res: any) => {
            this.banners.update(list => list.filter(b => b.id !== banner.id));
            if (this.activeCarouselIndex >= this.activeBanners().length) this.activeCarouselIndex = 0;
            this.toast.success("Sucessfully delete banner")
          },
            error: () => {
             this.toast.success("Failed to delete banner")
           }
      });
  }

 
  toggleActive(banner: BannerItem): void {
    
    this.adminService.editBanner(banner.id, { ...banner, isActive: !banner.isActive }).subscribe({
      next: (res: any) => {
            this.banners.update(list =>
              list.map(b => b.id === banner.id ? { ...b, isActive: !b.isActive } : b)
            );
            this.toast.success("Sucessfully Toggle ")
          },
            error: () => {
             this.toast.success("Failed to Toggle banner")
           }
      });
   
  }

}