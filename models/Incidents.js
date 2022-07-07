import { Schema, model, models } from 'mongoose';

const incidentsSchema = new Schema({
    name: String,
    status: String,
    impact_override: String,
    scheduled_for: Date,
    scheduled_until: Date,
    scheduled_remind_prior: Boolean,
    scheduled_auto_in_progress: Boolean,
    scheduled_auto_completed: Boolean,
    metadata: {},
    deliver_notifications: Boolean,
    auto_transition_deliver_notifications_at_end: Boolean,
    auto_transition_deliver_notifications_at_start: Boolean,
    auto_transition_to_maintenance_state: Boolean,
    auto_transition_to_operational_state: Boolean,
    backfill_date: String,
    backfilled: Boolean,
    body: String,
    components: {},
    component_ids: [ String ],
    scheduled_auto_transition: Boolean,
  }
);

const Incidents = models.Incidents || model('Incidents', incidentsSchema);

export default Incidents;