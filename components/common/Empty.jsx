"use client";

import { ArrowRightOutlined } from "@ant-design/icons";
import { ShoppingCartOutlined } from "@ant-design/icons";
export function Empty({
  title,
  text,
  action,
  onAction
}) {
  return <div className="market-empty"><span className="market-empty-icon"><ShoppingCartOutlined /></span><h2>{title}</h2><p>{text}</p>{action && <button className="market-primary" onClick={onAction}>{action} <ArrowRightOutlined /></button>}</div>;
}
