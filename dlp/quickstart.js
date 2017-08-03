/**
 * Copyright 2017, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

// [START quickstart]
// Imports the Google Cloud Data Loss Prevention library
const DLP = require('@google-cloud/dlp');

// Instantiates a client
const dlp = DLP();

// The string to inspect
const string = 'Robert Frost';

// The string to replace sensitive data with
const replaceString = 'REDACTED';

// The minimum likelihood required before redacting a match
const minLikelihood = 'LIKELIHOOD_UNSPECIFIED';

// The infoTypes of information to redact
const infoTypes = ['US_MALE_NAME', 'US_FEMALE_NAME'];

const items = [{ type: 'text/plain', value: string }];

const replaceConfigs = infoTypes.map((infoType) => {
  return {
    infoType: infoType,
    replaceWith: replaceString
  };
});

const request = {
  inspectConfig: {
    infoTypes: infoTypes,
    minLikelihood: minLikelihood
  },
  items: items,
  replaceConfigs: replaceConfigs
};

dlp.redactContent(request)
  .then((body) => {
    const results = body[0].items[0].value;
    console.log(results);
  })
  .catch((err) => {
    console.log(`Error: ${err.message || err}`);
  });
// [END quickstart]
