import PropTypes from 'prop-types';


export default function GpuDataRow({ header, data, headerClass }) {
  return (
    <tr>
      <th>{header}</th>
      <td className={headerClass}>{data}</td>
    </tr>
  );
}

GpuDataRow.displayName = "GpuDataRow";

GpuDataRow.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  headerClass: PropTypes.string.isRequired
};