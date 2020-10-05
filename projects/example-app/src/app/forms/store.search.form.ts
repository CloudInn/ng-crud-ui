import { FormView, FieldConfig } from 'crud';

export class StoreSearchForm extends FormView {
    layout = 'horizontal';
    controls: FieldConfig[] = [
        {
            name: 'basic',
            label: 'Basic',
            type: 'fieldset',
            cssWidth: '48',
            control: {
                fields: [
                    {
                        name: 'name',
                        label: 'Name',
                        type: 'text',
                        isEditable: true,
                        iContains: true,
                        defaultValue: '',
                        isClickable: true
                    },
                    {
                        name: 'first_name',
                        label: 'First Name',
                        type: 'text',
                        isEditable: true,
                        iContains: true,
                        defaultValue: '',
                        isClickable: true
                    },
                    {
                        name: 'last_name',
                        label: 'Last Name',
                        type: 'text',
                        isEditable: true,
                        iContains: true,
                        defaultValue: '',
                        isClickable: true
                    },
                    {
                        name: 'last_name',
                        label: 'Last Name',
                        type: 'text',
                        isEditable: true,
                        iContains: true,
                        defaultValue: '',
                        isClickable: true
                    },
                    {
                        name: 'date_of_birth',
                        label: 'Date of Birth',
                        type: 'date',
                        isEditable: true,
                        iContains: true,
                        isClickable: true
                    },
                    {
                        name: 'gender',
                        label: 'Gender',
                        type: 'select',
                        control: {
                            choices: [{ description: 'Female', id: 'F' }, { description: 'Male', id: 'M' }]
                        },
                        isEditable: true
                    },
                    {
                        name: 'loyalty_points',
                        label: 'Loyalty points',
                        type: 'text',
                        isEditable: false,
                    }
                ]
            }
        },

        {
            name: 'id',
            label: 'ID',
            type: 'fieldset',
            cssWidth: '50',
            control: {
                fields: [
                    {
                        name: 'document_type',
                        label: 'Document Type',
                        type: 'select',
                        control: {
                            choices: [{ description: 'Identity Card', id: 'I' },
                            { description: 'Passport', id: 'P' },
                            { description: 'Diriving License', id: 'D' }
                            ]
                        },
                        isEditable: true
                    },
                    {
                        name: 'ID_number',
                        label: 'ID Number',
                        type: 'text',
                        isEditable: true,
                        isHidden: false,
                        isSearchable: true,
                        isClickable: true
                    },
                    {
                        name: 'issue_place',
                        label: 'Issue place',
                        type: 'text',
                        isEditable: true,
                        isHidden: false,
                        isSearchable: true,
                        defaultValue: '',
                        isClickable: true
                    },
                    {
                        name: 'issue_date',
                        label: 'Issue Date',
                        type: 'date',
                        isEditable: true,
                        iContains: true,
                        isClickable: true
                    },
                    {
                        name: 'expiry_date',
                        label: 'Expiry Date',
                        type: 'date',
                        isEditable: true,
                        iContains: true,
                        isClickable: true
                    },
                    {
                        name: 'last_name',
                        label: 'Last Name',
                        type: 'text',
                        isEditable: true,
                        iContains: true,
                        defaultValue: '',
                        isClickable: true
                    },
                    {
                        name: 'place_of_birth',
                        label: 'Place of Birth',
                        isEditable: true,
                        type: 'text'
                    },
                    {
                        name: 'passport',
                        label: 'Passport ID',
                        type: 'text',
                        isEditable: true,
                        defaultValue: ''
                    },
                    {
                        name: 'driving_license_number',
                        label: 'Driving License',
                        type: 'text',
                        isEditable: true,
                        defaultValue: ''
                    },
                    {
                        name: 'old_id',
                        label: 'Profile Migration ID',
                        type: 'text',
                        isEditable: true,
                        defaultValue: ''
                    },
                ]
            }
        },

        {
            name: 'work',
            label: 'Work',
            type: 'fieldset',
            cssWidth: '48',
            control: {
                fields: [
                    {
                        name: 'occupation',
                        label: 'Occupation',
                        isEditable: true,
                        type: 'text'
                    },
                    {
                        name: 'last_name',
                        label: 'Last Name',
                        type: 'text',
                        isEditable: true,
                        iContains: true,
                        defaultValue: '',
                        isClickable: true
                    },
                    {
                        name: 'work_phone',
                        label: 'Work Phone',
                        type: 'text',
                        isEditable: true,
                        defaultValue: ''
                    },
                ]
            }
        },

        {
            name: 'conatcts',
            label: 'Contacts',
            type: 'fieldset',
            cssWidth: '50',
            control: {
                fields: [
                    {
                        name: 'email',
                        label: 'Email',
                        type: 'text',
                        isEditable: true,
                        defaultValue: ''
                    },
                    {
                        name: 'telephone',
                        label: 'Telephone',
                        type: 'text',

                        isEditable: true,
                        defaultValue: ''
                    },
                    {
                        name: 'mobile',
                        label: 'Mobile',
                        type: 'text',

                        isEditable: true,
                        defaultValue: ''
                    },
                    {
                        name: 'keep_personal_info',
                        label: 'Keep personal info',
                        type: 'boolean',
                        isEditable: true
                    },
                    {
                        name: 'keep_email',
                        label: 'Keep email',
                        type: 'boolean',
                        isEditable: true
                    },
                    {
                        name: 'email_third_party',
                        label: 'Email third party',
                        type: 'boolean',
                        isEditable: true
                    }
                ]
            }
        },
        {
            name: 'individualprofilecontactinfo_set',
            label: 'Individual profile contact info',
            type: 'formset',
            control: {
                fields: [
                    {
                        name: 'last_name',
                        label: 'Last Name',
                        type: 'text',
                        isEditable: true,
                        iContains: true,
                        defaultValue: '',
                        isClickable: true
                    },
                    {
                        name: 'city',
                        label: 'City',
                        type: 'text',
                        isEditable: true,
                        isSearchable: true,
                        defaultValue: ''
                    },
                    {
                        name: 'id',
                        label: 'ID',
                        type: 'text',
                        isEditable: false,
                        isHidden: true,
                        isSearchable: true,
                        defaultValue: ''
                    },
                    {
                        name: 'profile',
                        label: 'Profile',
                        type: 'text',
                        isEditable: false,
                        isHidden: false,
                        isSearchable: true,
                        defaultValue: ''
                    },
                    {
                        name: 'last_name',
                        label: 'Last Name',
                        type: 'text',
                        isEditable: true,
                        iContains: true,
                        defaultValue: '',
                        isClickable: true
                    },
                    {
                        name: 'address',
                        label: 'Address',
                        type: 'text',
                        isEditable: true,
                        isSearchable: true,
                        defaultValue: ''
                    },
                    {
                        name: 'zip_code',
                        label: 'Zip Code',
                        type: 'text',
                        isEditable: true,
                        isSearchable: true,
                        defaultValue: ''
                    },
                    {
                        name: 'po_box',
                        label: 'PO Box',
                        type: 'text',
                        isEditable: true,
                        isSearchable: true,
                        defaultValue: ''
                    },
                ]
            }
        }
    ];
}
