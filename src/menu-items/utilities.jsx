// assets
import {
  ApiOutlined
} from '@ant-design/icons';

// icons
const icons = {
  ApiOutlined
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Utilities',
  type: 'group',
  children: [
    {
      id: 'about',
      title: 'About',
      type: 'item',
      url: '/about',
      icon: icons.ApiOutlined
    }
  ]
};

export default utilities;
