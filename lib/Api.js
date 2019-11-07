export default class Api{
    getAppData(){
        const promises = [
            this._getApplications()
        ];
        return Promise.all(promises);
    }

    getDStvNowAppData(){
        const promises = [
            this._getDStvNowMovies(),
            this._getDStvNowSeries(),
            this._getDStvNowHomeScreenContent()
        ];
        return Promise.all(promises);
    }

    async _getDStvNowMovies(){
        const stream = await fetch("./static/movies.json");
        const data = await stream.json();
        return {ref:"DStvNowMovies", data};
    }

    async _getDStvNowHomeScreenContent(){
        const stream = await fetch("./static/DStvNowHome.json");
        const data = await stream.json();
        return {ref:"DStvNowHomeContent", data};
    }

    async _getDStvNowSeries(){
        const stream = await fetch("./static/series.json");
        const data = await stream.json();
        return {ref:"DStvNowSeries", data};
    }

    async _getApplications(){
        const stream = await fetch("./static/apps.json");
        const data = await stream.json();
        return {ref:"AppLauncher", data};
    }

    async _getStartupVideo(){
        const stream = await fetch("./static/StartupVideo.json");
        const data = await stream.json();
        return {ref:"StartupVideo", data};
    }
}

