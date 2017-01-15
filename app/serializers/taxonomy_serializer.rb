class TaxonomySerializer < ActiveModel::Serializer
  attributes :label, :confident, :score
end
