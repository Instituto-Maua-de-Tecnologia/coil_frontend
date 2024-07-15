export default interface IRequirementsProps {
    courses: [
        {
            id: number;
            course: string;
        }
    ];
    criterias: [
        {
            id: number;
            criteria: string;
        }
    ];
    languages: [
        {
            id: number;
            language: string;
            language_code: string;
        }
    ];
    institutions: [
        {
            id?: string;
            name?: string;
        }
    ];
}
