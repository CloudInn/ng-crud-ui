import { FormView } from 'crud';

export class TodoForm extends FormView {
  layout = 'horizontal';
  controls = [
    {
      name: 'title',
      label: 'Titile'
    }
  ];
}
