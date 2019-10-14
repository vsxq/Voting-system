import * as React from 'react';
import { Table } from './table';
import {Survey_head} from "./survey_head"

export const Survey_radio = () => {
    return (<div>
        <Survey_head type="单选"></Survey_head>
        <div>
            <Table></Table>
            </div>
    </div>)
}