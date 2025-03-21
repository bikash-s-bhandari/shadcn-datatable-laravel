<?php

namespace App\Enums;
use Illuminate\Contracts\Database\Eloquent\CastsAttributes;
use InvalidArgumentException;
use App\Models\User;

class RoleCast implements CastsAttributes
{
    public function get($model, $key, $value, $attributes)
    {
        return $value;
    }

    public function set($model, $key, $value, $attributes)
    {
        if (!in_array($value, [User::ROLE_ADMIN, User::ROLE_MANAGER], true)) {
            throw new InvalidArgumentException("Invalid role assigned");
        }

        return $value;
    }
}