import { Subject } from 'rxjs';

import { ModelFormComponent } from './model-form.component';

describe('ModelFormComponent _onSubmit', () => {
  let component: ModelFormComponent;
  let put$: Subject<any>;
  let api: jasmine.SpyObj<any>;

  beforeEach(() => {
    put$ = new Subject();
    api = jasmine.createSpyObj('ApiService', ['put', 'post']);
    api.put.and.returnValue(put$);
    component = Object.create(ModelFormComponent.prototype);
    Object.assign(component, {
      api,
      saving: false,
      disabled: false,
      mode: 'edit',
      id: 7,
      formGroup: { valid: true, value: {} },
      viewConfig: { metadata: { api: '/api/profile/', search_key: 'profile', default_filters: [] } },
    });
    spyOn(component, 'changeFieldsBeforeSending');
    spyOn(component, 'removeEmptyFormsets');
    spyOn(component, 'handlePostSubmit');
  });

  it('ignores a second submit while the first save is in flight', () => {
    component._onSubmit('saveAndEdit');
    component._onSubmit('save');

    expect(api.put).toHaveBeenCalledTimes(1);
  });

  it('allows a new submit once the previous save finished', () => {
    component._onSubmit('save');
    put$.next({ profile: { id: 7 } });
    component._onSubmit('save');

    expect(api.put).toHaveBeenCalledTimes(2);
  });

  it('allows a new submit after the previous save failed', () => {
    spyOn(component, 'displayError');
    component._onSubmit('save');
    put$.error({ error: {} });
    api.put.and.returnValue(new Subject());
    component._onSubmit('save');

    expect(api.put).toHaveBeenCalledTimes(2);
  });
});
