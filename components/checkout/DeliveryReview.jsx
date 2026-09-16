import { CalendarOutlined } from "@ant-design/icons";
import { EnvironmentOutlined } from "@ant-design/icons";
export function DeliveryReview({
  draft
}) {
  return <div className="market-delivery-review"><div><EnvironmentOutlined /><span><strong>{draft.firstName} {draft.lastName}</strong><p>{draft.street}{draft.apartment ? `, ${draft.apartment}` : ''}<br />{draft.postcode} {draft.city}, Sweden</p></span></div><div><CalendarOutlined /><span><strong>{draft.date}</strong><p>{draft.time}</p></span></div>{draft.notes && <p>Delivery notes: {draft.notes}</p>}</div>;
}
