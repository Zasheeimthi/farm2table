import { CalendarOutlined, EnvironmentOutlined } from '@ant-design/icons';

/** Read-only recap of the delivery details used on the payment and order screens. */
export default function DeliveryReview({ draft = {} }) {
  return (
    <div className="market-delivery-review">
      <div>
        <EnvironmentOutlined />
        <span>
          <strong>{draft.firstName} {draft.lastName}</strong>
          <p>
            {draft.street}{draft.apartment ? `, ${draft.apartment}` : ''}
            <br />{draft.postcode} {draft.city}, Sweden
          </p>
        </span>
      </div>
      <div>
        <CalendarOutlined />
        <span>
          <strong>{draft.date}</strong>
          <p>{draft.time}</p>
        </span>
      </div>
      {draft.notes && <p>Delivery notes: {draft.notes}</p>}
    </div>
  );
}
