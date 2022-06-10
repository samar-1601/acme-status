import { NEXT_PUBLIC_AUTH_TOKEN } from "../../../constants";

export function generateUsers() {
  const faker = require("faker");
  let name = faker.name.firstName();
  let statusID = Math.floor(Math.random() * 4);
  let status = ["scheduled", "in_progress", "verifying", "completed"];

  let newObj = {
    incident: {
      name: `${name}`,
      status: `${status[statusID]}`,
      impact: "maintenance",
      impact_override: "none",
      scheduled_for: "2022-06-03T17:35:43.583Z",
      scheduled_until: "2022-06-03T17:45:43.583Z",
      scheduled_remind_prior: true,
      scheduled_auto_in_progress: true,
      scheduled_auto_completed: true,
      metadata: {},
      deliver_notifications: true,
      auto_transition_deliver_notifications_at_end: true,
      auto_transition_deliver_notifications_at_start: true,
      auto_transition_to_maintenance_state: true,
      auto_transition_to_operational_state: true,
      auto_tweet_at_beginning: false,
      auto_tweet_on_completion: false,
      auto_tweet_on_creation: false,
      auto_tweet_one_hour_before: false,
      backfill_date: "string",
      backfilled: false,
      body: "string",
      components: {
        gr631q67jn64: "operational",
      },
      component_ids: ["6mw9kygkqdmz"],
      scheduled_auto_transition: true,
    },
  };

  fetch("https://api.statuspage.io/v1/pages/7dwwybj29fy8/incidents", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `OAuth ${NEXT_PUBLIC_AUTH_TOKEN ?? ""}`,
    },
    body: JSON.stringify(newObj),
  });
}
