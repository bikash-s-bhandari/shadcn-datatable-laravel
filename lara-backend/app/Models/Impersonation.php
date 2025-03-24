<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Impersonation extends Model
{
    protected $guarded = [];

    public function admin()
    {
        return $this->belongsTo(User::class, 'impersonator_id');
    }

    public function manager()
    {
        return $this->belongsTo(User::class, 'impersonating_id');
    }
}
