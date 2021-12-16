import cx from "classnames"
import "./FormText.css"

const FormText = ({
  focused = false,
  label,
  value,
  name,
  dirty = false,
  errors = [],
  onBlur,
  onChange,
  onFocus
}) => {
  return (
    <div className="field">
      <label htmlFor={name} className="label">
        {label}
      </label>
      <input
        className={cx("field__border", "field__input", {
          "field--error": dirty && errors.length > 0,
          "field--focused": focused
        })}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        name={name}
        type={"text"}
      />
      {dirty &&
        errors.length > 0 &&
        errors.map((error) => (
          <div className="field__errors" key={error}>
            {error}
          </div>
        ))}
    </div>
  )
}

export default FormText
