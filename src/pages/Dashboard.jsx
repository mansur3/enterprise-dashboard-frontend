// import styled from "styled-components";
// import {
//   BarChart,
//   PieChart,
//   LineChart,
//   Bar,
//   Pie,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
// } from "recharts";
// import Widget from "../components/Widget";
// import useFetch from "../hooks/useFetch";

// const Dashboard = () => {
//   const { data, loading, error } = useFetch("/api/dashboard");

//   const salesData = [
//     { month: "Jan", sales: 4000 },
//     { month: "Feb", sales: 3000 },
//     // ... more data
//   ];

//   return (
//     <DashboardGrid>
//       <Widget title="Sales Overview">
//         <BarChart width={500} height={300} data={salesData}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="month" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Bar dataKey="sales" fill="#8884d8" />
//         </BarChart>
//       </Widget>

//       <Widget title="User Activity">
//         <LineChart width={500} height={300} data={data?.activity}>
//           {/* Similar chart structure */}
//         </LineChart>
//       </Widget>

//       <Widget title="Category Distribution">
//         <PieChart width={500} height={300}>
//           <Pie
//             data={data?.categories}
//             dataKey="value"
//             nameKey="name"
//             cx="50%"
//             cy="50%"
//             outerRadius={80}
//           />
//         </PieChart>
//       </Widget>
//     </DashboardGrid>
//   );
// };

// const DashboardGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//   gap: 2rem;
//   padding: 1rem;
// `;

// export default Dashboard;

// src/pages/Dashboard.jsx
import { useState } from "react";
import styled from "styled-components";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts";
import Widget from "../components/Widget";

// Dummy data for demonstration
const salesData = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 3000 },
  { month: "Mar", sales: 5000 },
  { month: "Apr", sales: 2780 },
  { month: "May", sales: 1890 },
  { month: "Jun", sales: 2390 },
];

const userActivityData = [
  { id: 1, user: "John Doe", action: "Login", timestamp: "2024-03-01 09:30" },
  {
    id: 2,
    user: "Alice Smith",
    action: "Updated Profile",
    timestamp: "2024-03-01 10:15",
  },
  {
    id: 3,
    user: "Bob Wilson",
    action: "Created Order",
    timestamp: "2024-03-01 11:45",
  },
  { id: 4, user: "Emma Davis", action: "Login", timestamp: "2024-03-01 14:20" },
];

const categoryData = [
  { name: "Electronics", value: 400 },
  { name: "Clothing", value: 300 },
  { name: "Books", value: 200 },
  { name: "Home Goods", value: 278 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Dashboard = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  console.log("Welcome to the world");

  return (
    <DashboardGrid>
      {/* Sales Overview Widget */}
      <Widget title="Sales Overview (Last 6 Months)">
        <BarChart width={500} height={300} data={salesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="sales" fill="#8884d8" />
        </BarChart>
      </Widget>

      {/* User Activity Widget */}
      <Widget title="Recent User Activity">
        <UserActivityTable>
          <thead>
            <tr>
              <th>User</th>
              <th>Action</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {userActivityData.map((activity) => (
              <tr key={activity.id}>
                <td>{activity.user}</td>
                <td>{activity.action}</td>
                <td>{activity.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </UserActivityTable>
      </Widget>

      {/* Category Distribution Widget */}
      <Widget title="Product Category Distribution">
        <PieChart width={500} height={300}>
          <Pie
            data={categoryData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            onMouseEnter={(_, index) => setActiveIndex(index)}>
            {categoryData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </Widget>
    </DashboardGrid>
  );
};

// Styled components
const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
`;

const UserActivityTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 0.8rem;
    text-align: left;
    border-bottom: 1px solid ${({ theme }) => theme.border};
  }

  th {
    background-color: ${({ theme }) => theme.background};
  }

  tr:hover {
    background-color: ${({ theme }) => theme.hover};
  }
`;

export default Dashboard;
