import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AccountService } from 'src/app/services';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective {
  private authorities: string[];

  constructor(
    private accountService: AccountService,
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) { }

  @Input()
  set appHasRole(value: string | string[]) {
    this.authorities = typeof value === 'string' ? [value] : value;
    this.updateView();
    // Get notified each time authentication state changes.
    this.accountService.getAuthenticationState().subscribe(identity => this.updateView());
  }

  private updateView(): void {
    const hasAnyAuthority = this.accountService.hasAnyAuthority(this.authorities);
    this.viewContainerRef.clear();
    if (hasAnyAuthority) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }

}
