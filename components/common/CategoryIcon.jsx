import {
  AppstoreOutlined,
  CoffeeOutlined,
  CompassOutlined,
  HomeOutlined,
  InboxOutlined,
  ShoppingOutlined,
  SkinOutlined
} from '@ant-design/icons';

const icons = {
  all: <AppstoreOutlined />,
  'meat-fish': <SkinOutlined />,
  dairy: <CoffeeOutlined />,
  vegetables: <HomeOutlined />,
  pantry: <InboxOutlined />,
  drinks: <CompassOutlined />,
  kitchen: <ShoppingOutlined />
};

/** Category glyphs for the shared chips row (client-side only). */
export default function CategoryIcon({ category }) {
  return icons[category] ?? null;
}
