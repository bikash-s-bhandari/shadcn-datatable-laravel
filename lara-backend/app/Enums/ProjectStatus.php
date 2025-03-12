<?php

namespace App\Enums;

enum ProjectStatus: string
{
    case ALL = 'all';
    case RISK = 'risk';
    case ON_TRACK = 'onTrack';
    case ON_HOLD = 'onHold';
    case POTENTIAL_RISK = 'potentialRisk';
    case ARCHIVED = 'archived';

    public static function values(): array
    {
        return array_column(ProjectStatus::cases(), 'value');
    }
}
