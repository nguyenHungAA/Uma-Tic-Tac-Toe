export interface Uma {
    id: string;
    type?: string;
    attributes: {
        _id: string;
        id: string;
        name: string;
        title: string;
        avatar: string;
        difficulty: string;
        description: string;
        hobbies?: string[];
        favoriteUma?: string[];
        themeColor?: string;
        gradientColor?: string;
        totalRaces?: string;
        debutDate?: string;
        totalWins?: string;
        peakFans?: string;
        realLifeInterpretation?: string;
        status?: string;
        joinedDate?: string;
        introVideo?: string;
    };
}