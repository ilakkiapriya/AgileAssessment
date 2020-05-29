import React from 'react';
import MaterialTable from 'material-table';
import {Link} from 'react-router-dom';
import { useParams} from "react-router";
import AgileBreadCrumbs from './AgileBreadCrumbs'
import TrainIcon from '@material-ui/icons/Train';
import GroupIcon from '@material-ui/icons/Group';

export default function TeamContainer({propitems , match,  onAdd, onChange}) {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Emp Name', field: 'empName' },
      { title: 'Emp Id ', field: 'empId' },
      { title: 'Emp EmailId', field: 'empEmailId'},
      { title: 'Role', field: 'empRole', render: rowData =>{
        return(<>
          <select>
            <option>Select a role</option>
            <option value="developer">Developer</option>
            <option value="srmanager">Sr. Manager</option>
            <option value="tester">Tester</option>
            <option value="s/warchitect">Software Architect</option>
          </select>
        </>
         ) }}
    ]
  });

  let params = useParams();
  console.log("Train name used in param is ", params)
  function transformDataToUIModel() {
    var trainRow = {};
    for (const i in propitems) {
      if ( propitems[i].trainName === params.trainName ) {
        trainRow = propitems[i];
      }
    }
    console.log("Team data is " , trainRow)
    return trainRow;
  }
  function getBreadCrumbs() {
    var breadcrumbs = [];
    breadcrumbs.push({"name": params.trainName, "iconval": TrainIcon, "linkTo": '/trains'});
    breadcrumbs.push({"name": params.teamName, "iconval": GroupIcon});
    return breadcrumbs;
  }
  var trainRow=transformDataToUIModel();
  const bcprops = getBreadCrumbs();
  return (
    <div>
    <AgileBreadCrumbs bcprops={bcprops}/>
    <MaterialTable
      columns={state.columns}
      data={trainRow.teams}
      editable = {{
        onRowAdd: (newData) => 
        new Promise((resolve) => {
          setTimeout( () => {
              resolve();
              trainRow.teams.push(newData);
              onChange(trainRow, {"teams":trainRow.teams});
          }, 600);
        }),
        onRowUpdate: (newData) => {
          console.log(newData);
        },
        onRowDelete: (newData) => {
          console.log(newData);
        }
      }}
      options={{
        exportButton: true,
        showTitle: false
      }}
    />
        </div>
  );
}
