type formRowProps = {
  id: string;
  type: string;
  label: string;
  placeholder: string;
  value: string | number;
  onChange: () => {};
};

export default function FormRow({
  id,
  type,
  label,
  placeholder,
  value,
  onChange,
}: formRowProps) {
  return (
    <tr>
      <th>
        <label htmlFor={id}>{label}</label>
      </th>
      <td>
        <input
          type={type}
          id={id}
          name={id}
          value={value ?? ""}
          placeholder={placeholder}
          onChange={onChange}
        />
      </td>
    </tr>
  );
}
