https://cloud.google.com/billing/docs/how-to/notify#cap_disable_billing_to_stop_usage
https://www.youtube.com/watch?v=NWrZwXK92IM

1. Enable "Pay as you go" billing
2. Create a billing alert (`Google Cloud Platform -> Billing -> Budgets & alerts`)
   - [Create a pub sub topic](https://cloud.google.com/billing/docs/how-to/budgets-programmatic-notifications#pub-sub-topic)
3. Enable "Cloud Billing API" (`Google Cloud Platform -> APIs & Services`)
4. Add function as "Billing Account Administrator"

Example Payload

```json
{
  "budgetDisplayName": "name-of-budget",
  "alertThresholdExceeded": 1.0,
  "costAmount": 1.1,
  "costIntervalStart": "2019-01-01T00:00:00Z",
  "budgetAmount": 1,
  "budgetAmountType": "SPECIFIED_AMOUNT",
  "currencyCode": "USD"
}
```
