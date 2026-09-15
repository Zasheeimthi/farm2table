'use client';

import React from 'react';
import {
  AppstoreOutlined,
  CoffeeOutlined,
  CompassOutlined,
  HomeOutlined,
  InboxOutlined,
  ShoppingOutlined,
  SkinOutlined
} from '@ant-design/icons';

/**
 * Categories carry an icon *key* rather than a JSX element so the catalog stays
 * JSON-serialisable and can be served by the API / sent across the RSC boundary.
 */
const ICONS = {
  appstore: AppstoreOutlined,
  skin: SkinOutlined,
  coffee: CoffeeOutlined,
  home: HomeOutlined,
  inbox: InboxOutlined,
  compass: CompassOutlined,
  shopping: ShoppingOutlined
};

export default function CategoryIcon({ name }) {
  const Icon = ICONS[name] || AppstoreOutlined;
  return <Icon />;
}
