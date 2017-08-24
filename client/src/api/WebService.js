import axios from "axios";

import config from "../Config";

const WebService = () => {
    const webService = axios.create({
        "baseURL": config.apiHost,
        "responseType": "json",
        "headers": {"Accept": "application/json"}
    });

    const extractResponseData = ({data}) => data;

    return {
        getAnalysis({analysis, startDate, endDate}) {
            return webService.get(
                "/code-maat",
                {
                    "params": {
                        analysis,
                        startDate,
                        endDate
                    }
                })
                .then(extractResponseData);
        }
    };
};

export default WebService();
