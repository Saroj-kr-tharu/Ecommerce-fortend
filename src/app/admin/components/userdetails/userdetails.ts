import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, Input, OnChanges, OnInit, Signal, signal, SimpleChanges } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { sucessLoginType } from '../../../core/models/auth.model';
import { DashboardState } from '../../../core/models/dashboard.model';
import { AdminService } from '../../../core/services/admin/admin-service';
import { CusServices } from '../../../core/services/custumer/cus.services';
import { Cardbanner } from '../../../shared/components/cardbanner/cardbanner';
import { selectUsers } from '../../../store/admin/admin.selectors';


@Component({
  selector: 'app-userdetails',
  standalone: true,
  imports: [CommonModule, RouterLink, Cardbanner],
  templateUrl: './userdetails.html',
  styleUrl: './userdetails.css',
})
export class Userdetails implements OnInit, OnChanges {

  @Input() user: sucessLoginType | null = null;

  userSignal = signal<sucessLoginType | null>(null);
  route = inject(ActivatedRoute)
  private store = inject(Store<{ DashboardReducer: DashboardState }>);
  adminService = inject(AdminService) ;
  cusService = inject(CusServices) ;

  usersstate!: Signal<sucessLoginType[]>; 
  isLoading = signal<boolean>(false);
  isActive = signal<boolean>(false);
  error = signal<string | null>(null);
  bannerItems = signal<any[]>([]);

  displayName = computed(() => {
    const u = this.userSignal();
    return u?.username || u?.email?.split('@')[0] || 'Unknown User';
  }); 

  initials = computed(() => {
    const name = this.displayName();
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  });

  memberSince = computed(() => {
    const u = this.userSignal();
    if (!u?.createdAt) return '—';
    return new Date(u.createdAt).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  });

  lastUpdated = computed(() => {
  const d = this.userSignal()?.updatedAt;
  return d ? new Date(d).toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: '2-digit', 
    hour: 'numeric', minute: '2-digit'
  }).toLowerCase() : '—';
});

  constructor(  ) {
   
     effect(() => {
      this.bannerItems.set([

        { title: "UserName", value: this.displayName(), icon: "pi pi-shopping-bag" },
        { title: "Ban", value: this.isActive(), icon: "pi pi-users" },
        { title: "MemberSince", value: this.memberSince(), icon: "pi pi-shopping-bag" },
        { title: "LastUpdated", value: this.lastUpdated(), icon: "pi pi-shopping-bag" },
        // { title: "Total Orders", value: this.totaladmin(), icon: "pi pi-shopping-cart" },
        // { title: "Total Cancelled Orders", value: this.totalban(), icon: "pi pi-check-circle" },
        // { title: "Total Confirmed Orders", value: this.totalban(), icon: "pi pi-check-circle" },
        // { title: "Total Confirmed Payment", value: this.totalban(), icon: "pi pi-check-circle" },
    
      ]);
    });
  }

  ngOnInit(): void {
    const UserId = this.route.snapshot.paramMap.get('id'); 
    this.usersstate = this.store.selectSignal(selectUsers);

    const userDetails = this.usersstate().find(item => `${item.id}` == UserId); 
    console.log('user Details => ', this.usersstate())
    this.userSignal.set(userDetails ?? null);
    this.loadOrders(UserId)

    if(userDetails?.isActive){
      this.isActive.set(true);
    }

    if (UserId) {
      this.loadUsers(UserId);
      this.loadOrders(UserId)
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && this.user) {
        this.userSignal.set(this.user);
    }
  }

  private loadUsers(id: string): void {
    this.isLoading.set(true);
    this.error.set(null);
    this.adminService.getUserByUserId(id).subscribe({
      next: (res:any) => {
        console.log('User loaded:', res?.data);
        this.userSignal.set(res?.data ?? null);
        this.isLoading.set(false);
      },
      error: (err) => {
        // console.error('Error loading product:', err);
        this.error.set('Failed to load product');
        this.isLoading.set(false);
      }
    });
  }
  private loadOrders(id: any): void {
    this.isLoading.set(true);
    this.error.set(null);
    this.cusService.GetOrdersByUserId(id, 1, 10).subscribe({
      next: (res:any) => {
        console.log('orders loaded:', res?.data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load orders');
        this.isLoading.set(false);
      }
    });
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      // console.log('Copied:', text); 
    });
  }
}