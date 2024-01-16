function initGrowthBook() {
  const { GrowthBook } = window.growthbook;



  const growthbook = new GrowthBook({
    apiHost: "https://cdn.growthbook.io",
    clientKey: "sdk-UfRZuOTFkYjSvja",
    enableDevMode: true,
    subscribeToChanges: true,
    trackingCallback: (experiment, result) => {
      // TODO: Use your real analytics tracking system
      console.log("Viewed Experiment", {
        experimentId: experiment.key,
        variationId: result.key
      });
    }
  });


  window.growthb = growthbook;
  return growthbook.loadFeatures();
}

if (window.growthbook) {
  console.log('here');

  initGrowthBook().then(() => {
    if (window.growthb.isOn("cta-label-1")) {
      console.log("cta-label-1 is enabled after!")
    } else {
      console.log('no on here either');
    }
  });

  if (window.growthb.isOn("cta-label-1")) {
    console.log("cta-label-1 is enabled!")
  } else {
    console.log('not on');
  }

}
