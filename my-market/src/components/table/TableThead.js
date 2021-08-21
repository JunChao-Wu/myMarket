import './TableThead.css'

export default {
  name: 'TableThead',
  props: {
    store: {
      required: true,
    }
  },
  methods: {

  },
  render() {
    const columns = this.store.states.columns;
    // console.log(columns)
    // console.log(this)
    return (
      <table width="100%">
        <colgroup>
        {
          this._l(columns, column => 
            <col width={column.width}></col>
          )
        }
        </colgroup>
        <thead>
          <tr>
            {
              this._l(columns, column => 
                <th
                  class="head_style">
                  { column.label }
                </th>
              )
            }
          </tr>
        </thead>
      </table>
    );
  },
}