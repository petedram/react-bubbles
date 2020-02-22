import React, { useState, useEffect } from "react";
import { axiosWithAuth } from '../api/axiosAuth';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState(
    {
    color: '', 
    code: {hex:''} 
  });



  useEffect(() => {
  console.log('useeffect colortoedit',colorToEdit)
}, [colorToEdit]);



  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
    console.log('updated colortoedit',colorToEdit)
  };

  const saveEdit = e => {
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    console.log('put this id and object', colorToEdit.id, colorToEdit)
    
    axiosWithAuth().put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
    .then(res => {
        console.log('res to put with auth', res);
    })
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    console.log('DELETE!', color.id)
    axiosWithAuth().delete(`http://localhost:5000/api/colors/${color.id}`)
    .then(res => {
        console.log('res to delete with auth', res);
      })

  };

  const changeHandler = ev => {
    ev.persist();
    let value = ev.target.value;

    if (ev.target.name === 'hex') {
      setNewColor({
        ...newColor,
        code: {hex: value}
      });
    } else {
      setNewColor({
        ...newColor,
        [ev.target.name]: value
      });
    }

    console.log('change', ev.target.name);
    console.log('item after change', newColor);

  };

  const addColor = ev => {
  ev.preventDefault()

    // make a delete request to delete this color
    console.log('add!!!!!!', newColor)

    axiosWithAuth().post(`http://localhost:5000/api/colors`, newColor)
    .then(res => {
        console.log('res to delete with auth', res);
      })

  };


  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      {/* stretch - build another form here to add a color */}
          <h4>Add Color</h4>
          <form onSubmit={addColor}>
            <input
              type="text"
              name="color"
              onChange={changeHandler}
              placeholder="color name"
              value={newColor.name}
            />
            <input
              type="text"
              name="hex"
              onChange={changeHandler}
              placeholder="hex code"
              value={newColor.hex}
            />
            <div className="button-row">
            <button >Add</button>
            </div>
          </form>
    </div>
  );
};

export default ColorList;
