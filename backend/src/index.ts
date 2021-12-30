import { pubsub, logger } from 'firebase-functions';
import { GoogleAuth } from 'google-auth-library';
import { cloudbilling } from 'googleapis/build/src/apis/cloudbilling';

const PROJECT_ID = process.env.GCLOUD_PROJECT;
const PROJECT_NAME = `projects/${PROJECT_ID}`;

const billing = cloudbilling('v1');
const authClient = new GoogleAuth({
  scopes: ['https://www.googleapis.com/auth/cloud-billing', 'https://www.googleapis.com/auth/cloud-platform'],
});

export const billingManager = pubsub.topic('billing').onPublish(async ({ json: { costAmount, budgetAmount } }) => {
  if (costAmount > budgetAmount) {
    logger.warn(`Budget exceeded (Current cost: ${costAmount})! Attempting to disable billing...`);
    await _disableBillingForProject(PROJECT_NAME);
  } else {
    logger.warn(`No action necessary. (Current cost: ${costAmount})`);
  }
});

const _isBillingEnabledForProject = async (projectName: string) => {
  try {
    const response = await billing.projects.getBillingInfo({
      name: projectName,
      auth: authClient,
    });
    return response.data.billingEnabled;
  } catch (err) {
    logger.error('Unable to determine if billing is enabled on specified project, assuming billing is enabled', err);
    return true;
  }
};

const _disableBillingForProject = async (projectName: string) => {
  try {
    const billingEnabled = await _isBillingEnabledForProject(projectName);
    if (billingEnabled) {
      await billing.projects.updateBillingInfo({
        name: projectName,
        requestBody: { billingAccountName: '' },
        auth: authClient,
      });
      logger.info(`Billing disabled for ${projectName}`);
    } else {
      logger.info(`Billing already disabled for ${projectName}`);
    }
  } catch (err) {
    logger.error('Unable to disable billing for project', err);
  }
};
