import { fail, warn, danger, message } from "danger";
import fs from "fs";

const PR = danger.github.pr;
const MODIFIED_FILES = danger.git.modified_files;
const MODIFIED_SRC_FILES = MODIFIED_FILES.filter(
  path => path.startsWith("src") && (path.endsWith(".ts") || path.endsWith(".tsx"))
);

// PR into master
if (PR.base.ref === "master") {
  // PR description has no issue refference that is being closed
  if (!PR.body.includes("closes #"))
    fail("PR description should include issue refference being closed");

  // PR has no asignee
  if (!PR.assignee) warn("PR should have an asignee");

  // PR title has no issue refference
  if (!PR.title.includes("#")) warn("PR title should include issue refference");

  // Check if package.json was updated
  if (!MODIFIED_FILES.includes("package-lock.json"))
    message("package-lock.json is unchanged, no npm updates avaliable?");

  // Check if Podfile was updated
  if (!MODIFIED_FILES.includes("ios/Podfile.lock"))
    message("ios/Podfile.lock is unchanged, no pod updates avaliable?");

  // Check if android/Gemfile was updated
  if (!MODIFIED_FILES.includes("android/Gemfile.lock"))
    message("android/Gemfile.lock is unchanged, no gem updates avaliable?");

  // Check if android/Gemfile was updated
  if (!MODIFIED_FILES.includes("ios/Gemfile.lock"))
    message("ios/Gemfile.lock is unchanged, no gem updates avaliable?");

  // Check if build.gradle was updated
  if (!MODIFIED_FILES.includes("android/app/build.gradle"))
    message("build.gradle is unchanged, no android plugin updates avaliable?");

  // Check if package lockfile was updated
  if (MODIFIED_FILES.includes("package.json") && !MODIFIED_FILES.includes("package-lock.json"))
    fail("package.json was updated, but no changes were detected in package-lock.json");

  // Check if Pod lockfile was updated
  if (MODIFIED_FILES.includes("ios/Podfile") && !MODIFIED_FILES.includes("ios/Podfile"))
    fail("ios/Podfile was updated, but no changes were detected in ios/Podfile.lock");

  // Check if ios/Gemfile lockfile was updated
  if (MODIFIED_FILES.includes("ios/Gemfile") && !MODIFIED_FILES.includes("ios/Gemfile.lock"))
    fail("ios/Gemfile was updated, but no changes were detected in ios/Gemfile.lock");

  // Check if android/Gemfile lockfile was updated
  if (MODIFIED_FILES.includes("ios/Gemfile") && !MODIFIED_FILES.includes("android/Gemfile.lock"))
    fail("android/Gemfile was updated, but no changes were detected in android/Gemfile.lock");

  // Check modified src files for required / dissalowed content
  MODIFIED_SRC_FILES.forEach(file => {
    const content = fs.readFileSync(file).toString();

    // Map through react components / state classes
    if (
      file.includes("/components") ||
      file.includes("/composites") ||
      file.includes("/containers") ||
      file.includes("/views") ||
      file.includes("/state")
    ) {
      // Check if file is a class and has default export
      if (!content.includes("class") || !content.includes("export default"))
        fail(`Component should be a class and have default export in (${file})`);
    }

    if (content.includes("TODO"))
      // Check for TODO comment
      warn(`\`TODO\` comment is present in (${file})`);

    // Check for eslint-disable comment
    if (content.includes("eslint-disable"))
      warn(`\`eslint-disable\` comment is present in (${file})`);

    // Check for console.* logs
    if (content.includes("console.")) fail(`\`console.*\` log is present in (${file})`);

    // Check for $FlowFixMe comment
    if (content.includes("$FlowFixMe")) warn(`\`$FlowFixMe\` comment is present in ${file}`);

    // Check if @flow comment is present in file
    if (!content.includes("@flow")) fail(`No \`@flow\` comment found in (${file})`);

    // Check if animated components were made, but no useNativeDriver was specified
    if (content.includes("Animated.") && !content.includes("useNativeDriver"))
      fail(`Animated component added, but no \`useNativeDriver\` found in (${file})`);

    // Only allow subscribing to state from containers/index file
    if (
      content.includes("<Subscribe") &&
      (!file.includes("/containers") || file.includes("/containers/index"))
    )
      fail(`You can only subscribe to state from /containers/[container], not (${file})`);
  });
}

// Only PR's from master are allowed into [ios | android]-development
if (PR.base.ref === "android-development" || PR.base.ref === "ios-development") {
  if (PR.head.ref !== "master") fail("Only master branch can be merged into development branches");
}

// Only PR's from android-development are allowed into android-staging
if (PR.base.ref === "android-staging" && PR.head.ref !== "android-development")
  fail("Only android-development branch can be merged into android-staging branch");

// Only PR's from ios-development are allowed into ios-staging
if (PR.base.ref === "ios-staging" && PR.head.ref !== "ios-development")
  fail("Only ios-development branch can be merged into ios-staging branch");

// Only PR's from android-staging are allowed into android-production
if (PR.base.ref === "android-production" && PR.head.ref !== "android-staging")
  fail("Only android-staging branch can be merged into android-production branch");

// Only PR's from ios-staging are allowed into ios-production
if (PR.base.ref === "ios-production" && PR.head.ref !== "ios-staging")
  fail("Only ios-staging branch can be merged into ios-production branch");
