import * as React from 'react';

export interface DynamicSelectProps {
  data: any[];

  onSelectChange: (value: string) => void;
}

export class DynamicSelect extends React.Component<DynamicSelectProps> {
  constructor(props: DynamicSelectProps) {
    super(props);
  }

  handleChange = (event: React.FormEvent<HTMLSelectElement>): void => {
    let selectedValue = event.currentTarget.value;
    this.props.onSelectChange(selectedValue);
  }

  render(): JSX.Element {
    let arrayOfData = this.props.data;
    let options = arrayOfData.map(data => 
      <option
        key={ data.id }
        value={ data.id }
      >
        { data.name }
      </option>
    );

    return (
      <select name="dynamicSelect" onChange={ this.handleChange }>
        <option>Select Item</option>
        { options }
      </select>
    )
  }
}