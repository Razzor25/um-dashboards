const fs = require('fs');
const path = require('path');

const myLighthouseConfig = {
  passThreshold: 90,
  domain: 'https://localhost:4200',
  lighthouseOptions: {
    port: 55012,
    output: 'html',
    onlyCategories: ['accessibility', 'performance', 'best-practices'],
  },
  urls: [],
};

const accessibilityResults = {
  passed: 0,
  failed: 0,
  indeterminate: 0,
};

const bestPracticesResults = {
  passed: 0,
  failed: 0,
  indeterminate: 0,
};

const performanceResults = {
  passed: 0,
  failed: 0,
  indeterminate: 0,
};

setupAndRunLighthouse().then(r => {
  writeResultsToConsole();
});

async function setupAndRunLighthouse() {
  const outputDir = `${__dirname}/lighthouse-reports/Report_${Date.now()}`;
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (const url of myLighthouseConfig.urls) {
    try {
      console.log(`Testing Page: ${myLighthouseConfig.domain + url}`);
      const results = await runLighthouse(myLighthouseConfig.domain + url);
      if (myLighthouseConfig.lighthouseOptions.onlyCategories.includes('accessibility')) {
        extractAccessibilityResults(results);
      }
      if (myLighthouseConfig.lighthouseOptions.onlyCategories.includes('best-practices')) {
        extractBestPracticesResults(results);
      }
      if (myLighthouseConfig.lighthouseOptions.onlyCategories.includes('performance')) {
        extractPerformanceResults(results);
      }
      const fileName = `${url.replace(/https?:\/\/localhost:4200/, '').replace(/\//g, '_')}.html`;
      const filePath = path.join(outputDir, fileName);
      fs.writeFileSync(filePath, results.report);
    } catch (err) {
      console.error(`Error running Lighthouse for ${url}:`, err);
    }
  }
}

// Executed once per URL test
async function runLighthouse(url, config = null) {
  const lighthouse = await import('lighthouse');
  const chromeLauncher = await import('chrome-launcher');
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const runnerResult = await lighthouse.default(url, myLighthouseConfig.lighthouseOptions, config);
  await chrome.kill();
  return runnerResult;
}

function extractAccessibilityResults(results) {
  const accessibilityScore = results.lhr.categories.accessibility.score * 100;
  if (accessibilityScore === 0) {
    console.log(
      `---> Accessibility  : ${accessibilityScore}  ⚠️ -- A score of 0 may indicate an issue testing this page --`,
    );
    accessibilityResults.indeterminate += 1;
  } else if (accessibilityScore >= myLighthouseConfig.passThreshold) {
    console.log(`---> Accessibility  : ${accessibilityScore}  ✅ `);
    accessibilityResults.passed += 1;
  } else {
    console.log(`---> Accessibility  : ${accessibilityScore}  ❌ `);
    accessibilityResults.failed += 1;
  }
}

function extractBestPracticesResults(results) {
  const bestPracticeScore = results.lhr.categories['best-practices'].score * 100;
  if (bestPracticeScore === 0) {
    console.log(
      `---> Best Practices : ${bestPracticeScore}  ⚠️ -- A score of 0 may indicate an issue testing this page --`,
    );
    bestPracticesResults.indeterminate += 1;
  } else if (bestPracticeScore >= myLighthouseConfig.passThreshold) {
    console.log(`---> Best Practices : ${bestPracticeScore}  ✅ `);
    bestPracticesResults.passed += 1;
  } else {
    console.log(`---> Best Practices : ${bestPracticeScore}  ❌ `);
    bestPracticesResults.failed += 1;
  }
}

function extractPerformanceResults(results) {
  const performanceScore = results.lhr.categories.performance.score * 100;
  if (performanceScore === 0) {
    console.log(
      `---> Performance    : ${performanceScore}  ⚠️ -- A score of 0 may indicate an issue testing this page --`,
    );
    performanceResults.indeterminate += 1;
  } else if (performanceScore >= myLighthouseConfig.passThreshold) {
    console.log(`---> Performance    : ${performanceScore}  ✅ `);
    performanceResults.passed += 1;
  } else {
    console.log(`---> Performance    : ${performanceScore}  ❌ `);
    performanceResults.failed += 1;
  }
}

function writeResultsToConsole() {
  if (myLighthouseConfig.lighthouseOptions.onlyCategories.includes('accessibility')) {
    console.log('------------------------------------');
    console.log('🏁 Lighthouse Accessibility Results');
    console.log(`✅  Passed:         ${accessibilityResults.passed}`);
    console.log(`❌  Failed:         ${accessibilityResults.failed}`);
    console.log(`⚠️ Indeterminate:  ${accessibilityResults.indeterminate}`);
    console.log(`📊 Success Rate:   ${(accessibilityResults.passed / myLighthouseConfig.urls.length) * 100}%`);
  }
  if (myLighthouseConfig.lighthouseOptions.onlyCategories.includes('best-practices')) {
    console.log('------------------------------------');
    console.log('🏁 Lighthouse Best Practices Results');
    console.log(`✅  Passed:         ${bestPracticesResults.passed}`);
    console.log(`❌  Failed:         ${bestPracticesResults.failed}`);
    console.log(`⚠️ Indeterminate:  ${bestPracticesResults.indeterminate}`);
    console.log(
      `📊 Success Rate:   ${Math.round((bestPracticesResults.passed / myLighthouseConfig.urls.length) * 100)}%`,
    );
  }
  if (myLighthouseConfig.lighthouseOptions.onlyCategories.includes('performance')) {
    console.warn('------------------------------------');
    console.warn('🏁 Lighthouse Performance Results');
    console.warn(`✅  Passed:         ${performanceResults.passed}`);
    console.warn(`❌  Failed:         ${performanceResults.failed}`);
    console.warn(`⚠️ Indeterminate:  ${performanceResults.indeterminate}`);
    console.warn(`📊 Success Rate:   ${(performanceResults.passed / myLighthouseConfig.urls.length) * 100}%`);
  }
}
