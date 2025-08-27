import PropTypes from 'prop-types';


export default function FormRow ({ id, type, label, placeholder, value, onChange }) {
  return(
    <tr>
      <th>
        <label htmlFor={id}>{label}</label>
      </th>
      <td>
        <input
          type={type}
          id={id}
          name={id}
          value={value}
          placeholder={placeholder}
          onChange={e => onChange(e.target.value)}
        />
      </td>
    </tr>
  );
}

FormRow.displayName = "FormRow";

FormRow.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
