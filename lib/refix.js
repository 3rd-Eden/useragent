'use strict';

/*
 * Note: this fixes only some known bad patterns which appear in the upsteam
 * uap-core lib.
 *
 * It doesn't make a generic regexp safe!
 *
 * All new regexps should be taken through Weideman's tool and analyzed
 * individually.
 *
 */

// Order is important!
var replaces = [
  /*
   * Trimming looks like a good change
   * FIXME: this block doesn't pass uap-core tests yet
   */
  [' *([^;]*) *', ' *([^; ][^;]*[^; ]|[^; ]?) *'],
  [' *([^;]+) *', ' *([^; ][^;]*[^; ]|[^; ]) *'],
  [' *([^;]+) *', ' *([^; ][^;]*[^; ]|[^; ]) *'], // Twice!
  ['([^;/]+) *', '([^;/]*[^;/ ]) *'],
  ['([^;/]*) *', '([^;/]*[^;/ ]|) *'],
  ['([^/;\\)]+) *', '([^/;\\) ]*[^/;\\) ]) *'],

  /*
   * Pure representation changes with lookahead magic
   */
  ['[^\\);]+)[^\\);]*', '[^\\);]+(?=[\\);]))[^\\);]*'],

  /*
   * Pure representation changes (should not affect the result)
   */
  ['(\\d+)\\.?(\\d+)?.?(\\d+)?.?(\\d+)?', '(\\d+)(?:\\.(\\d+)?(?:[^\\d](\\d+)?(?:[^\\d](\\d+)?)?)?)?'],
  ['(\\d+)\\.?(\\d+)?\\.?(\\d+)?\\.?(\\d+)?', '(\\d+)(?:\\.(\\d+)?(?:\\.(\\d+)?(?:\\.(\\d+)?)?)?)?'],
  ['(\\d+)\\.(\\d+)\\.?(\\d+)?\\.?(\\d+)?', '(\\d+)\\.(\\d+)(?:\\.(\\d+)?(?:\\.(\\d+)?)?)?'],
  ['(\\d+)\\.(\\d+)\\.?(\\d+)?', '(\\d+)\\.(\\d+)(?:\\.(\\d+)?)?'],
  ['(\\d+)\\.?(\\d+)?', '(\\d+)(?:\\.(\\d+)?)?'],
  ['([^.\\s]+)\\.([^.\\s]+)?\\.?([^.\\s]+)?', '([^.\\s]+)\\.([^.\\s]+)?(?:\\.([^.\\s]+)?)?'],
  ['(\\d+).+', '(\\d+)[^\\d].*'],
  ['(\\d+)[\\d.]*', '(\\d+)(?:\\.[\\d.]*)?'],
  ['(\\d+).*', '(\\d+)(?:[^\\d].+)?'],
  ['\\d+[A-z0-9_]*', '\\d+(?:[A-z_][A-z0-9_]*)?'],
  ['\\d+[^;/]+', '\\d+(?:[^;/\\d][^;/]*|[^;/])'],
  ['\\d+[^;/]*', '\\d+(?:[^;/\\d][^;/]*)?'],
  ['\\d+[^ ;/]*', '\\d+(?:[^ ;/\\d][^ ;/]*)?'],
  ['\\d+[^;]*', '\\d+(?:[^;\\d][^;]*)?'],
  ['\\d+[^\\);]+', '\\d+(?:[^\\);\\d][^\\);]*|[^\\);])'],
  [' *([^;,\\)]+)', ' *([^;,\\) ][^;,\\)]*|[^;,\\)])'],
  [' *([^;\\/]+)', ' *([^;\\/ ][^;\\/]+|[^;\\/])'],
  [' *([^;/]+)', ' *([^;/ ][^;/]+|[^;/])'],
  [' *([^;]+)', ' *([^; ][^;]+|[^;])'],
  [' *[^;/]+', ' *(?:[^;/ ][^;/]+|[^;/])'],
  [' *([^;/]*)', ' *([^;/ ][^;/]+|[^;/]?)'],
  ['([A-Za-z0-9\\-]+).*', '([A-Za-z0-9\\-]+)(?:[^A-Za-z0-9\\-].*)?'],
  [' *(.*?)', ' *([^ ].*?|)'],
  ['\\.\\d+.*', '\\.\\d+(?:[^\\d].*|)?'],
  ['(?:HTC|Htc|HTC_blocked[^;]*)[^;]*', '(?:HTC|Htc|HTC_blocked)[^;]*'],
  ['(?:CUS:([^;]*)|([^;]+)) *', '(?:CUS:([^;]*[^; ]|)|([^;]+[^; ]|[^;])) *'],
  ['(?:.*SW-Version/.*)*', '(?:.*SW-Version/.*)?'],
  ['(\\d+)\\.?([^.\\s]+)?\\.?([^.\\s]+)?', '(\\d+)\\.?([^.\\s]+)?(?:\\.([^.\\s]+)?)?'],
  [')? *([A-Za-z0-9 \\-_\\!\\[\\]:]*', ')? *((?:[A-Za-z0-9\\-_\\!\\[\\]:][A-Za-z0-9 \\-_\\!\\[\\]:]*)?'],
  [')? *([A-Za-z0-9 _\\!\\[\\]:]*', ')? *((?:[A-Za-z0-9_\\!\\[\\]:][A-Za-z0-9 _\\!\\[\\]:]*)?'],
  /*
   * Don't change the result of the specific regexps
   * (possibly due to presense of other regexps with similar result)
   */
  ['(\\d+).(\\d+)\\.(\\d+)', '(\\d+)[^\\d](\\d+)\\.(\\d+)'],

  /*
   * Length limit, should be fine for all known testcases
   */
  ['CPU.*OS[ +](\\d+)', 'CPU.{0,40}OS[ +](\\d+)'],

  /*
   * Non-greedy sometimes helps
   */
  ['Mobile.*[ +]Safari', 'Mobile.*?[ +]Safari'],
  [';.*(201[1-9]).*', ';.*?(201[1-9]).*?'],

  /*
   * Changing . to \. will break 1-0-0 support, changing to [^\d] will break foo/10000 support
   * We don't want to parse foo/10000 as 1.0.0, let's parse it as 10000.0.0
   */
  ['(\\d+).(\\d+).(\\d+).(\\d+)', '(\\d+)(?:[^\\d](\\d+)(?:[^\\d](\\d+)(?:[^\\d](\\d+))?)?)?'],
  ['(\\d+).(\\d+).(\\d+)', '(\\d+)(?:[^\\d](\\d+)(?:[^\\d](\\d+))?)?'],
  ['(\\d+).(\\d+)', '(\\d+)(?:[^\\d](\\d+))?']
];

function fix(pattern) {
  for (var i in replaces) {
    var row = replaces[i];
    if (pattern.indexOf(row[0]) === -1) continue;
    pattern = pattern.replace(row[0], row[1]);
  }
  return pattern;
}

module.exports = { fix: fix };
