import * as React from 'react';
import debounce from 'lodash.debounce';
import isEqual from 'lodash.isequal';

export interface PersistProps {
  name: string;
  data: any;
  debounce?: number;
  onMount: (data: any) => void;
}

export class Persist extends React.Component<PersistProps, {}> {
  static defaultProps = {
    debounce: 300,
  };

  persist = debounce((data: any) => {
    window.localStorage.setItem(this.props.name, JSON.stringify(data));
  }, this.props.debounce);

  componentDidUpdate({ data }: PersistProps) {
    if (!isEqual(data, this.props.data)) {
      this.persist(this.props.data);
    }
  }

  componentDidMount() {
    const data = window.localStorage.getItem(this.props.name);
    if (data && data !== null) {
      this.props.onMount(JSON.parse(data));
    }
  }

  render() {
    return null;
  }
}
