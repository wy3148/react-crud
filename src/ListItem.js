import React from 'react';

const ListItem = (props)=>{
    return  <li className="list-group-item"><button className='btn-sm ml-4 btn-info' onClick={() => { props.editTodo(props.item.index) }}>U</button>
    {props.item.name}
    <button className='btn-sm ml-4 btn btn-danger' onClick={() => { props.delTodo(props.item.index) }}>X</button>
  </li>
}

export default ListItem;