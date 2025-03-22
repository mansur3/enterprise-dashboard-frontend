import { useState, useEffect } from "react";
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
import { handleGetSalesData, handleGetUserActivity } from "../services/index";

// Dummy data for demonstration
const salesData = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 3000 },
  { month: "Mar", sales: 5000 },
  { month: "Apr", sales: 2780 },
  { month: "May", sales: 1890 },
  { month: "Jun", sales: 2390 },
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
  const [salesData, setSalesData] = useState([]);
  const [userActivityData, setUserActivityData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const sales = await handleGetSalesData();
      const userActivity = await handleGetUserActivity();
      setSalesData(sales?.data ?? []);
      setUserActivityData(userActivity?.data ?? []);
    }
    fetchData();
  }, []);

  return (
    <DashboardGrid>
      {/* Sales Overview Widget */}
      <Widget title="Sales Overview (Last 6 Months)">
        <BarChart width={400} height={300} data={salesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="car" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total_car" fill="#8884d8" barSize={25} />
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
            {userActivityData?.length > 0 &&
              userActivityData.map((activity) => (
                <tr key={activity.id}>
                  <td>{activity.username}</td>
                  <td>{activity.activity}</td>
                  <td>{activity.createdAt}</td>
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
