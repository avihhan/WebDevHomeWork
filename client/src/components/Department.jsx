import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Record = (props) => (
  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
      {props.record.name}
    </td>
  </tr>
);

export default function DepartmentList() {
  const [managementRecords, setManagementRecords] = useState([]);
  const [itRecords, setITRecords] = useState([]);
  const [salesRecords, setSalesRecords] = useState([]);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5050/department`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const records = await response.json();
      // Filter records by department and set state accordingly
      setManagementRecords(records.Management || []);
      setITRecords(records.IT || []);
      setSalesRecords(records.Sales || []);
    }
    getRecords();
  }, []);

  // This method will map out the records for each department
  function recordList(records) {
    return records.map((record) => {
      return <Record record={record} key={record._id} />;
    });
  }

  // This following section will display the table with the records of individuals.
  return (
    <>
      <h2 className="text-lg font-semibold p-4">Employee Records</h2>
      <h4 className="text-lg font-semibold p-4">Management</h4>
      <div className="border rounded-lg overflow-hidden mb-4">
        <table className="w-full caption-bottom text-sm">
          <tbody className="[&amp;_tr:last-child]:border-0">
            {recordList(managementRecords)}
          </tbody>
        </table>
      </div>
      <h4 className="text-lg font-semibold p-4">IT</h4>
      <div className="border rounded-lg overflow-hidden mb-4">
        <table className="w-full caption-bottom text-sm">
          <tbody className="[&amp;_tr:last-child]:border-0">
            {recordList(itRecords)}
          </tbody>
        </table>
      </div>
      <h4 className="text-lg font-semibold p-4">Sales</h4>
      <div className="border rounded-lg overflow-hidden mb-4">
        <table className="w-full caption-bottom text-sm">
          <tbody className="[&amp;_tr:last-child]:border-0">
            {recordList(salesRecords)}
          </tbody>
        </table>
      </div>
    </>
  );
}
