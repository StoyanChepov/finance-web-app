import Modal from "react-modal";
import { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { GetAllItemTypes } from "../../hooks/useItem";
import { useAuthContext } from "../../contexts/AuthContext";

Modal.setAppElement("#root");

export default function ConfirmCreate({
  isOpen,
  onRequestClose,
  onConfirm,
  object,
}) {
  const { values, changeHandler, submitHandler } = useForm(
    { name: "", type: "" },
    async ({ name, type }) => {
      type = itemtypes.length > 0 && type == "" ? itemtypes[0]._id : itemtypes;
      try {
        await onConfirm(name, type);
      } catch (error) {
        console.error(error);
      }
    }
  );
  const { userId } = useAuthContext();
  const [itemtypes, setItemTypes] = GetAllItemTypes(userId);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="react-modal-content"
      overlayClassName="react-modal-overlay"
      contentLabel="Confirm Create"
    >
      <h2 className="modal-header">Create {object}</h2>
      <form onSubmit={submitHandler}>
        <label htmlFor="category" className="modal-text">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter name"
          value={values.name}
          onChange={changeHandler}
        />
        <select
          className="custom-select__control"
          id="type"
          name="type"
          value={values.type}
          onChange={changeHandler}
          required
        >
          {itemtypes.length > 0 &&
            itemtypes.map((item) => (
              <option
                className="custom-select__option"
                key={item._id}
                value={item._id}
              >
                {item.name}
              </option>
            ))}{" "}
          {itemtypes.length === 0 && (
            <option className="custom-select__option" value="">
              No itemtypes
            </option>
          )}
        </select>

        <div className="modal-buttons">
          <button
            onClick={onRequestClose}
            className="modal-button modal-button-cancel"
          >
            Cancel
          </button>
          <button className="modal-button modal-button-confirm-create">
            Create
          </button>
        </div>
      </form>
    </Modal>
  );
}
