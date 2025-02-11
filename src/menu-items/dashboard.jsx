// assets
import { DashboardOutlined,UserOutlined  } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  UserOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'simulator',
      title: 'Simulator',
      type: 'item',
      url: '/simulator',
      icon: icons.UserOutlined,
      breadcrumbs: true
    }
  ]
};

export default dashboard;
