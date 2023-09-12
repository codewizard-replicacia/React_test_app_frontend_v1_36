import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MuiTable from '.';

configure({ adapter: new Adapter() });
describe('MuiTable Component', () => {
	it('should render correctly with number of columns provided', () => {
		const component = mount(
			<MuiTable
				cols={[
					{ Header: 'Column 1', accessor: 'col1' },
					{ Header: 'Column 2', accessor: 'col2' },
				]}
				data={[
					{ col1: 'Item 1', col2: 'Item 2' },
					{ col1: 'Item 3', col2: 'Item 4' },
				]}
      />
    );
		// 2 columns provided
    expect(component.find('th').length).toBe(2);
  });
	
	it('should render correctly with number of rows provided', () => {
		const component = mount(
			<MuiTable
				cols={[
					{ Header: 'Column 1', accessor: 'col1' },
					{ Header: 'Column 2', accessor: 'col2' },
				]}
				data={[
					{ col1: 'Item 1', col2: 'Item 2' },
					{ col1: 'Item 3', col2: 'Item 4' },
				]}
				size={2}
			/>
		);
		
		expect(component.find('tbody').find('tr').length).toBe(2);
  });
});
