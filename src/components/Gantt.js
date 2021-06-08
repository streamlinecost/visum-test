/**
 * Gantt Component
 */

// React libraries
import React from 'react';

// Bryntum libraries
import { BryntumGantt } from '@bryntum/gantt-react';

// Application imports
import Task from '../lib/Task';
import '../lib/StatusColumn';
import '../lib/GanttToolbar';

const Gantt = props => {

    const ganttConfig = {
        tbar : { type: 'gantttoolbar' },

        dependencyIdField : 'wbsCode',

        project: {
            // Let the Project know we want to use our own Task model with custom fields / methods
            taskModelClass : Task,
            transport      : {
                load: {
                    url : 'data/visum-test-data.json'
                }
            },
            autoLoad : true,

            // The State TrackingManager which the UndoRedo widget in the toolbar uses
            stm: {
                autoRecord : true
            }
        },

        startDate               : '2021-06-01',
        endDate                 : '2021-07-30',
        resourceImageFolderPath : 'users/',
        columns                 : [
            { type: 'wbs' },
            { type: 'name', width: 250 },
            { type: 'startdate' },
            { type: 'duration' },
            { type: 'percentdone', showCircle: true, width: 70 },
            {
                type  : 'predecessor',
                width : 112
            },
            {
                type  : 'successor',
                width : 112
            },
            { type: 'addnew' }
        ],

        subGridConfigs: {
            locked: {
                flex : 3
            },
            normal: {
                flex : 4
            }
        },

        columnLines : false,

        rollupsFeature: {
            disabled : true
        },
        baselinesFeature: {
            disabled : true
        },
        progressLineFeature: {
            disabled   : true,
            statusDate : new Date(2019, 0, 25)
        },
        filterFeature         : true,
        dependencyEditFeature : true,
        timeRangesFeature     : {
            showCurrentTimeLine : true
        },
        labelsFeature: {
            left: {
                field  : 'name',
                editor : {
                    type : 'textfield'
                }
            }
        }
    };

    return <BryntumGantt {...ganttConfig} {...props} />;
};

export default Gantt;
