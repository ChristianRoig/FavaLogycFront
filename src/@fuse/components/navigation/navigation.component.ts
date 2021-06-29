import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { LoginService } from 'app/auth/login/login.service';



@Component({
    selector       : 'fuse-navigation',
    templateUrl    : './navigation.component.html',
    styleUrls      : ['./navigation.component.scss'],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FuseNavigationComponent implements OnInit
{
    @Input()
    layout = 'vertical';

    @Input()
    navigation: any;

    rolActual: string = "comun";

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     *
     * @param {ChangeDetectorRef} _changeDetectorRef
     * @param {FuseNavigationService} _fuseNavigationService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseNavigationService: FuseNavigationService,
        private _loginService: LoginService
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Load the navigation either from the input or from the service
        this.navigation = this.navigation || this._fuseNavigationService.getCurrentNavigation();

        // Subscribe to the current navigation changes
        this._fuseNavigationService.onNavigationChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {

                // Load the navigation
                this.navigation = this._fuseNavigationService.getCurrentNavigation();

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Subscribe to Rol Changes (FAVA 29/06/2021)
        this._subscribeToRolChanges();

        // Subscribe to navigation item
        merge(
            this._fuseNavigationService.onNavigationItemAdded,
            this._fuseNavigationService.onNavigationItemUpdated,
            this._fuseNavigationService.onNavigationItemRemoved
        ).pipe(takeUntil(this._unsubscribeAll))
         .subscribe(() => {

             // Mark for check
             this._changeDetectorRef.markForCheck();
         });
    }
    
    //  (FAVA 29/06/2021)
    // en Gestionate: private _visualizarSegunRol(): void {
    private _subscribeToRolChanges(): void {
            this._loginService.rolOnChanged
            .pipe(takeUntil(this._unsubscribeAll))
                .subscribe(
                    (respu: []) => {
                        if (respu == null) {
                            respu = [];
                        }

                        console.log("rol change");
                        console.log(respu);
                        this.hideByRol(respu);
                    },
                    (error: any) => {
                        console.log("rol change error");
                        console.log(error);
                        this.hideByRol([]);      
                    });
    }

    // en Gestionate: private switchByRol(roles: string[]): void {
    private hideByRol(roles: string[]): void {
        if (roles.includes("comun") || roles == null || roles.length == 0){
            this._fuseNavigationService.updateNavigationItem('infoAuxiliar', {
                hidden: true
            });          
        }
    }

}
