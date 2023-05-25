<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Protocol extends Model
{
    use HasFactory;

    public function person()
    {
        return $this->belongsTo(Person::class);
    }
    
    protected $table = 'protocols';
    protected $fillable = [
        'description',
        'deadline',
        'person_id',
    ];
}
