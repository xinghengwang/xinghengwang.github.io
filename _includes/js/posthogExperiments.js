

const featureFlagsToProcess = [
  { key: 'test-xing-name', elementId: 'test-xing-name', override_text: 'My George'}
];

posthog.onFeatureFlags(function() {
  // feature flags should be available at this point
  featureFlagsToProcess.forEach((entry) => {

    try {
    if (posthog.isFeatureEnabled(entry.key)) {
      var element = document.getElementById(entry.elementId || entry.key);
      if (element) {
        // if we don't find element we don't do anything.
        if (entry.override_text) {
          element.textContent = entry.override_text;
        } else {
          // try to get text from payload
          posthog.getFeatureFlagPayload(entry.key).then((payload) => {
            console.log('payload ' + JSON.stringify(payload));
            if (payload && payload.text) {
              element.textContent = payload.text;
            }
          });
        }
      }
    }

  } catch(err) {
    console.log('error processing ' + entry.key);
    console.error(err);
  }

  });
})

