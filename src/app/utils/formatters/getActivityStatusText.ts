import { ActivityStatusEnum } from "@enums/ActivityStatusEnum.ts";

export default function getActivityStatusText(status: number): string {
    switch (status as ActivityStatusEnum) {
        case ActivityStatusEnum.TO_START:
            return "Coming Soon";
        case ActivityStatusEnum.ACTIVE:
            return "Apply Now";
        case ActivityStatusEnum.ON_HOLD:
            return "Under Analysis";
        case ActivityStatusEnum.ENDED:
            return "Ended";
        case ActivityStatusEnum.CANCELED:
            return "Canceled";
        default:
            return "Unknown status";
    }
}
