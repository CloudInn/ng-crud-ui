import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { ModelFormComponent } from './model-form.component';

fdescribe('ModelFormComponent', () => {
  let component: ModelFormComponent;
  const mockApiService = jasmine.createSpyObj('ApiService', ['post', 'put']);
  const mockFormBuilder = jasmine.createSpyObj('FormBuilder', ['group']);
  const mockOtherService = jasmine.createSpyObj('SomeOtherService', ['someMethod']);
  const mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
  const mockAnotherService = jasmine.createSpyObj('AnotherService', ['someMethod']);
  const mockInjector = jasmine.createSpyObj('Injector', ['get']);
  const mockChangeDetectorRef = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(() => {
    component = new ModelFormComponent(
        mockApiService,
        mockFormBuilder,
        mockOtherService,
        mockDialog,
        mockAnotherService,
        mockInjector,
        mockChangeDetectorRef,
        mockRouter
      );
    component.controlsConfig = [
      { name: 'numberField', type: 'number' },
      { name: 'textField', type: 'text' }
    ] as any;
    component.formGroup = new FormGroup({
      numberField: new FormControl(''),
      textField: new FormControl('some text'),
      formsetField: new FormArray([
        new FormGroup({
          nestedNumberField: new FormControl(''),
          nestedTextField: new FormControl('nested text')
        })
      ])
    });
    component.formsets = [
      {
        name: 'formsetField',
        control: {
          fields: [
            { name: 'nestedNumberField', type: 'number' },
            { name: 'nestedTextField', type: 'text' }
          ]
        }
      }
    ] as any;
  });

  it('should transform empty strings to null for number fields', () => {
    component.transformEmptyStringsToNull();

    expect(component.formGroup.get('numberField').value).toBeNull();
    expect(component.formGroup.get('textField').value).toBe('some text');

    const formsetArray = component.formGroup.get('formsetField') as FormArray;
    expect(formsetArray.at(0).get('nestedNumberField').value).toBeNull();
    expect(formsetArray.at(0).get('nestedTextField').value).toBe('nested text');
  });
});
