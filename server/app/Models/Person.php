<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Person extends Model
{
    use HasFactory;

    public function protocols(): HasMany
    {
        return $this->hasMany(Protocol::class);
    }

    protected $table = 'people';
    protected $fillable = [
        'name',
        'birthday',
        'cpf',
        'sex',
        'city',
        'neighborhood',
        'street',
        'number',
        'complement',
    ];
}
